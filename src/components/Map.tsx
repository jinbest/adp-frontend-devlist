import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mapWrapper: {
            // height: "fit-content",
            // position: "relative",
            padding: "10px",
        },
        mapContainer: {
            height: "700px",
            [theme.breakpoints.down("sm")]: {
                height: "1200px",
            },
            [theme.breakpoints.down("md")]: {
                height: "1000px",
            },
        },
    })
)
type Props = {
    locations: any[]
}

const Map = ({ locations }: Props) => {
    const classes = useStyles()
    let centerX = 49.865759
    let centerY = -97.211811
    let zoom = 2
    if (locations && locations.length > 0) {
        const longitudes = locations.map((v) => v.longitude)
        const latitudes = locations.map((v) => v.latitude)
        centerX = latitudes.reduce((a, b) => a + b, 0) / 5
        centerY = longitudes.reduce((a, b) => a + b, 0) / 5
        const maxRadiusX = Math.max(...latitudes.map((v) => v - centerX))
        const maxRadiusY = Math.max(...longitudes.map((v) => v - centerY))
        zoom = Math.round(maxRadiusY / 2.5)
    }
    const getAddress = (location: any) => {
        return `${location.address_1}, ${location.address_2 ? location.address_2 + ", " : ""}${
            location.city
        }, ${location.postcode}, ${location.country}`
    }
    return (
        <div className={classes.mapWrapper}>
            <MapContainer
                center={[centerX, centerY]}
                zoom={zoom}
                scrollWheelZoom={true}
                className={classes.mapContainer}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations &&
                    locations.map((element, index) => {
                        return (
                            <Marker position={[element.latitude, element.longitude]} key={index}>
                                <Popup>{getAddress(element)}</Popup>
                            </Marker>
                        )
                    })}
                {/* {locations.forEach((element, index) => {
                    return (
                        <Marker position={[49.865759 + index, -97.211811 + index]} key={index}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    )
                })} */}
            </MapContainer>
        </div>
    )
}
export default Map
