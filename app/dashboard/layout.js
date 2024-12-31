import Footer from './_components/Footer'
import Header from './_components/Header'

function layout({children}) {
  return (
    <div>
       <Header />
        <div>
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default layout