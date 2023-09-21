import { useEffect, useState } from "react"
import { Nav, NavDropdown, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import http from "../http"

export const FrontNav = () => {
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])

    useEffect(() => {
        http.get('/categories')
            .then(({data}) => {
                setCategories(data)

                return http.get('/brands')
            })
            .then(({data}) => setBrands(data))
            .catch(err => {})

    }, [])

    

    return <Navbar expand="lg" variant="light" bg="white">
        <Navbar.Toggle/>
        <Navbar.Collapse>
            <Nav className="mx-auto mb-2 mb-lg-0">
                <Nav.Item>
                    <Link to="/" className="nav-link">Home</Link>
                </Nav.Item>
                <Nav.Item>
                    <NavDropdown title="Categories">
                        {categories.map(category => <Link to={`/category/${category._id}`} className="dropdown-item" key={category._id}>{category.name}</Link>)}
                    </NavDropdown>
                </Nav.Item>
                <Nav.Item>
                    <NavDropdown title="Brands">
                    {brands.map(brand => <Link to={`/brand/${brand._id}`} className="dropdown-item" key={brand._id}>{brand.name}</Link>)}

                    </NavDropdown>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}