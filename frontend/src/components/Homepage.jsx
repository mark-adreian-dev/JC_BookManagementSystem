import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


const Header = () => {
    const [books, setBookList] = useState();

    useEffect(() => {
        fetch("http://localhost:8000/api/books", {
            method: "GET"
        }) 
        .then(response => response.json())
        .then(response => {
            setBookList(response)
        })
    }, [])

    if (!books) {
        return <div></div>;
    }

    const handleclick = (id) => {
        window.location.href = `/books/${id}/edit`
    }

    const handleAddBook = () => {
        window.location.href = '/books/add'
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/api/books/${id}`, { method: "DELETE"})
        .then(response => response.json())
        .then(response => {
            alert(`The Book "${response.data}" was Removed successfully`)
            window.location.href = '/'
        })
  
    }
 
    return (
        <>
        <div className="p-10 flex justify-center flex-col items-center">
            <div className="w-full flex justify-between items-center mb-16">
                <h1 className=" font-bold text-7xl ">Book Management System</h1>
                <button onClick={handleAddBook} className="btn btn-success">Add Book</button>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table relative w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Book Title</th>
                            <th>Published Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             books.data.map(book => {
                                return <tr key={book.id}>
                                <td className="w-[10%]">{book.id}</td>
                                <td className="w-[20%] font-bold text-lg">{book.title}</td>
                                <td className="w-[calc(70%-294.41px)]  text-lg">{book.published_year}</td>
                                <td className="w-[294.41px]">
                                    <Link to={`books/${book.id}`}>
                                        <button className="btn btn-success   mr-2">See More</button>
                                    </Link>
                                    <button onClick={() => handleclick(book.id)} className="btn btn-warning text-black mr-2">Edit</button>    
                                    <button onClick={() => handleDelete(book.id)} className="btn btn-error  mr-2">Delete</button>
                                </td>
                            </tr>
                             })
                             
                        }
                       
                    </tbody>
                </table>
            </div>
            
            {/* <div className="w-full grid grid-cols-3 gap-y-6">
            
                {
                    books.data.map(book => {
                        return <div key={book.id} className="card bg-base-300 w-[96%] shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{book.title}</h2>
                                    <p className="text-left mb-11">{book.description}</p>
                                    <div className="card-actions justify-start">
                                        <button onClick={() => handleclick(book.id)} className="btn btn-warning text-black mr-2">Edit</button>
                                        <button onClick={() => handleDelete(book.id)} className="btn btn-error text-white mr-2">Delete</button>
                                        <Link to={`books/${book.id}`}>
                                            <button className="btn btn-success text-white">See More</button>
                                        </Link>
                                    </div>
                                </div>
                            </div> 
                    })
                }
            </div> */}
        </div>
        </>
    )
}

export default Header
