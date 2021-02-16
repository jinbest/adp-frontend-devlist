import React from "react"
import { Grid, Box, Typography } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Button } from "../../components"
import { Link } from "react-router-dom"
import { useT } from "../../i18n/index"

type Props = {
    subDomain?: string
    handleStatus: (status: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: "center",
            marginTop: "70px !important",
            [theme.breakpoints.up("md")]: {
                margin: "150px 0 !important",
                alignItems: "center",
                display: "flex",
                textAlign: "left",
            },
        },
        item1: {
            order: 2,
            "& > div": {
                margin: "auto !important",
            },
            [theme.breakpoints.up("md")]: {
                order: 1,
                marginTop: "0px",
                "& > div": {
                    margin: "inherit !important",
                },
            },
            marginTop: "50px",
        },
        item2: {
            order: 1,
            [theme.breakpoints.up("md")]: {
                order: 2,
            },
        },
    })
)

const Section4 = ({ subDomain, handleStatus }: Props) => {
    const data = require(`../../assets/${subDomain}/Database`)
    const repair = data.repairData.section4
    const t = useT()
    const classes = useStyles()

    return (
        <section className={subDomain + "-Container"}>
            <Grid
                container
                className={classes.root}
                spacing={2}
                style={{ display: subDomain === "mobiletechlab" ? "none" : "flex" }}
            >
                <Grid item xs={12} md={6} className={classes.item1}>
                    <Typography
                        className={subDomain + "-repair-section-title-1"}
                        style={{ color: repair.themeCol }}
                    >
                        {t(repair.title)}
                    </Typography>
                    <Typography
                        className={subDomain + "-repair-section-content"}
                        style={{ color: repair.themeCol }}
                    >
                        {t(repair.content)}
                    </Typography>
                    <Box className={subDomain + "-repair-section-button"}>
                        <Link
                            to="#"
                            style={{ textDecoration: "none" }}
                            onClick={() => {
                                handleStatus(true)
                            }}
                        >
                            <Button
                                title={t(repair.btnTitle)}
                                bgcolor={data.colorPalle.repairButtonCol}
                                borderR="20px"
                                subDomain={subDomain}
                            />
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} className={classes.item2}>
                    <img src={repair.img} style={{ width: "100%", maxWidth: "700px" }} />
                </Grid>
            </Grid>
        </section>
    )
}

export default Section4
