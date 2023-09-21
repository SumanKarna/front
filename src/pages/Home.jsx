import { Carousel } from "react-bootstrap"
import { ProductList } from "../components"
import { useEffect, useState } from "react"
import http from "../http";

export const Home = () => {

    const [featured, setFeatured] = useState([])
    const [latest, setLatest] = useState([])
    const [topSelling, setTopSelling] = useState([])
    const [loading, setLoading] = useState([])

    useEffect(() => {
        setLoading(true)

        http.get('products/featured')
            .then(({data}) => {
                setFeatured(data)

                return http.get('products/latest')
            })
            .then(({data}) => {
                setLatest(data)

                return http.get('products/top-selling')
            })
            .then(({data}) => setTopSelling(data))
            .catch(err => {})
            .finally(() => setLoading(false))
            
    }, [])

    return <div className="col-12">
    <main className="row">
        <div className="col-12 px-0">
                <Carousel>
                    <Carousel.Item>
                        <img src="/slider-1.jpg" className="slider-img" />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img src="/slider-2.jpg" className="slider-img" />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img src="/slider-3.jpg" className="slider-img" />
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="col-12">
                <ProductList title="Featured Products" products={[...featured].splice(0, 4)} loading={loading} />
            </div>
            <div className="col-12">
                <hr />
            </div>

            <div className="col-12">
                <ProductList title="Latest Products" products={[...latest].splice(0, 4)} loading={loading} latest />
            </div>
            <div className="col-12">
                <hr />
            </div>

            <div className="col-12">
                <ProductList title="Top selling Products" products={[...topSelling].splice(0, 4)} loading={loading} />
            </div>
            <div className="col-12">
                <hr />
            </div>

            <div className="col-12 py-3 bg-light d-sm-block d-none">
                <div className="row">
                    <div className="col-lg-3 col ms-auto large-holder">
                        <div className="row">
                            <div className="col-auto ms-auto large-icon">
                                <i className="fas fa-money-bill" />
                            </div>
                            <div className="col-auto me-auto large-text">
                                Best Price
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col large-holder">
                        <div className="row">
                            <div className="col-auto ms-auto large-icon">
                                <i className="fas fa-truck-moving" />
                            </div>
                            <div className="col-auto me-auto large-text">
                                Fast Delivery
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col me-auto large-holder">
                        <div className="row">
                            <div className="col-auto ms-auto large-icon">
                                <i className="fas fa-check" />
                            </div>
                            <div className="col-auto me-auto large-text">
                                Genuine Products
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
}