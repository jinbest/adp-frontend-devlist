import { createStyles, makeStyles } from "@material-ui/core"
import React from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
const useStyles = makeStyles(() =>
    createStyles({
        mapWrapper: {
            width: "100%",
            height: "fit-content",
            position: "relative",
            padding: "20px",
        },
    })
)
type Props = {
    locations: any[]
}

const Map = ({ locations }: Props) => {
    const position = [51.505, -0.09]
    const classes = useStyles()
    const center = [locations[0].longitude as number, locations[0].latitude as number]
    console.log("locations==========>", locations)
    const longitudes = locations.map((v) => v.longitude)
    const latitudes = locations.map((v) => v.latitude)

    return (
        <div className={classes.mapWrapper}>
            <MapContainer
                center={[49.865759, -97.211811]}
                zoom={4}
                scrollWheelZoom={false}
                style={{ height: "500px" }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker position={[49.865759, -97.211811]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
                {locations.map((element, index) => {
                    console.log(element)
                    return (
                        <Marker
                            position={[parseFloat(element.latitude), parseFloat(element.longitude)]}
                            key={index}
                        >
                            <Popup>{element.location_name}</Popup>
                        </Marker>
                    )
                })}
                {/* {locations.forEach((element, index) => {
                    console.log("element", element)
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
