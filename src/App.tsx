import { LoadingBar } from './components/LoadingBar';
import { SearchForm } from './components/SearchForm';
import { useFetchData } from './useFetchdata';


function App() {
  const { data, loading, error } = useFetchData();

  if (loading) {
    return( 
      <div>
        <h1 className='title'>Cargando...</h1>
        <LoadingBar />
      </div>
  )
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <>
      <h1 className='title'>Calcula tu presupuesto!</h1>
      <SearchForm data={data} />
    </>
  )
}

export default App
