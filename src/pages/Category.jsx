import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../http"
import { Loading, ProductCard } from "../components"
import { Pagination } from "react-bootstrap"

export const Category = () => {

    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [paginated, setPaginated] = useState([])
    const [current, setCurrent] = useState(1)
    const [pages, setPages] = useState(1)
    const limit = 24
    const [offset, setOffset] = useState(0)
    const [pagelinks, setPagelinks] = useState([])


    const params = useParams()

    useEffect(() => {
        setLoading(true)

        http.get(`categories/${params.id}`)
            .then(({ data }) => {
                setCategory(data)

                return http.get(`categories/${params.id}/products`)
            })
            .then(({ data }) => setProducts(data))
            .catch(err => { })
            .finally(() => setLoading(false))
    }, [params.id])

    useEffect(() => {
        setCurrent(1)

        let temp = [...products].splice(offset, limit)
        let total = (Math.ceil(products.length / limit))

        setPaginated(temp)
        setPages(total)
    }, [products])

    useEffect(() => {
        let temp = (current - 1) * limit
        setOffset(temp)
    }, [current])

    useEffect(() => {
        let temp = [...products].splice(offset, limit)

        setPaginated(temp)
    }, [offset,products])

    useEffect(() => {
        let list = [<Pagination.Prev onClick={() => setCurrent(current - 1)} disabled={current == 1 }/>]
        for(let i = 1; i <= pages; i++){
            list.push(<Pagination.Item key={i} onClick={() => setCurrent(i)} active={i == current}>{i}</Pagination.Item>)
        }

        list.push(<Pagination.Next onClick={() => setCurrent(current + 1)} disabled={current == pages }/>)

        setPagelinks(list)
    }, [pages, current])

    return loading ? <Loading /> : <div className="col-12">
        <main className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-12 py-3">
                        <div className="row">
                            <div className="col-12 text-center text-uppercase">
                                <h2>{category.name}</h2>
                            </div>
                        </div>
                        <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-sm-2 justify-content-center">

                            {paginated.map(product => <ProductCard product={product} key={product._id} />)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
            {pages > 1 ? <Pagination>
                        {pagelinks.map(link => link)}
                    </Pagination> : null}
            </div>
        </main>
    </div>


}