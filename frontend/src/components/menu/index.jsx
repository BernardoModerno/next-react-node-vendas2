import Link from 'next/link'


export function Menu (){
return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-1 d-md-block bg-light sidebar collapse">
       <div className="position-sticky pt-3">
         <ul className="nav flex-column">
           <li className="nav-item">
             <Link href="/dashboard" >
               <a className="nav-link">Dashboard</a>
             </Link>
           </li>
           <li className="nav-item">
             <Link href="/products" className="nav-link">
              <a className="nav-link">Produtos</a>
             </Link>
           </li>
         </ul>
 
       </div>
    </nav>
  )
    

}
