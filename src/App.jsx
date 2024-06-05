import { useProductsQuery, useProductQuery } from './redux/productSlice'

function App() {

const {data, isLoading, error, isFetching, isSuccess} = useProductsQuery();

  return (
    <div>
      {isLoading && <p>Data is Loading...</p>}
      {isFetching && <p>Data is Fetching...</p>}
      {error && <p>Something went wrong...</p>}
      {isSuccess && data.products.map((item)=> (
        <div key={item.id}>
          <p><span style={{fontWeight: "bolder"}}>Title</span> {item.title}</p>
        <span><ProductDetail id={item.id} /></span>
        </div>
      ))}
    </div>
  )
}

export const ProductDetail = ({id}) => {
  const {data} = useProductQuery(id);

  return(
    <div>
      {JSON.stringify(data, undefined, 2)}
    </div>
  )
}

export default App
