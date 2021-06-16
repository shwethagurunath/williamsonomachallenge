import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import React, { useState } from "react";


const ProductsComponent = (props) => {
    const { productList } = props;
    const theme = useTheme();
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        image: {
            height: '250px',
            width: '240px',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        root: {
            maxWidth: 400,
            flexGrow: 1,
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            height: 50,
            paddingLeft: theme.spacing(4),
            backgroundColor: theme.palette.background.default,
        },
        img: {
            height: 255,
            maxWidth: 400,
            overflow: 'hidden',
            display: 'block',
            width: '100%',
        }
    }));

    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const [open, setOpen] = React.useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpen = (product) => {
        setOpen(true);
        setSelectedProduct(product)
    };

    const handleClose = () => {
        setOpen(false);
        setActiveStep(0);
    };

    console.log(productList)
    return (
        <div>
            <Grid container spacing={3}>
                {
                    productList.map((product) => {
                        console.log(product);
                        {
                            return <> <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                <Card style={{ border: '1px solid black', cursor: product.images.length ? 'pointer' : 'default' }} onClick={() => product.images.length ? handleOpen(product) : null}>
                                    <CardActionArea>
                                        {
                                            product.thumbnail ? <div className='.MuiCardMedia-root .MuiCardMedia-media' style={{
                                                height: '250px',
                                                width: '240px',
                                                marginLeft: 'auto',
                                                marginRight: 'auto'
                                            }}>
                                                <img src={product.thumbnail.href} className='.MuiCardMedia-img' style={{ margin: 'auto', height: '250px', width: '280px' }}></img>
                                            </div> : null
                                        }

                                        {
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="h3">
                                                    {product.name}
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    {
                                                        product.priceRange ?
                                                            product.priceRange.regular ?
                                                                <div style={{ fontWeight: 'bold' }}>Regular Price Range: ${product.priceRange.regular.low} - ${product.priceRange.regular.high}</div>
                                                                : null : null
                                                    }
                                                    {
                                                        product.priceRange ?
                                                            product.priceRange.selling ?
                                                                <div style={{ fontWeight: 'bold', color: 'green' }}>Sale Price Range: ${product.priceRange.selling.low} - ${product.priceRange.selling.high}</div>
                                                                : null : null
                                                    }
                                                    {
                                                        product.price ?
                                                            product.price.regular ?
                                                                <div style={{ fontWeight: 'bold' }}>Regular Price: ${product.price.regular}</div> : null : null
                                                    }
                                                    {
                                                        product.price ?
                                                            product.price.selling ?
                                                                <div style={{ fontWeight: 'bold', color: 'green' }}>Sale Price: ${product.price.selling}</div> : null : null
                                                    }
                                                </Typography>
                                            </CardContent>
                                        }

                                    </CardActionArea>
                                </Card>
                            </Grid>
                            </>
                        }
                    })
                }
                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={open}>
                                        <div className={classes.paper}>
                                            {
                                                selectedProduct?.images.length ? <div className={classes.root}>
                                                    <img
                                                        className={classes.img}
                                                        src={selectedProduct.images[activeStep].href}
                                                    />
                                                    <MobileStepper
                                                        steps={selectedProduct.images.length}
                                                        position="static"
                                                        variant="text"
                                                        activeStep={activeStep}
                                                        nextButton={
                                                            <Button size="small" onClick={handleNext} disabled={activeStep === selectedProduct.images.length - 1}>
                                                                Next
                                                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                                            </Button>
                                                        }
                                                        backButton={
                                                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                                                Back
                                                            </Button>
                                                        }
                                                    />
                                                </div> : null
                                            }

                                        </div>
                                    </Fade>
                                </Modal>
            </Grid>

        </div>
    )
}

export default ProductsComponent;