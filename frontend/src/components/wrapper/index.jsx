import { NavSup } from '../navsup'

export function Wrapper(props) {
  
    return (
      <>
        
          <div className="container-fluid">
          <NavSup />
           <div className="row">
             <main className="col-md-12 ms-sm-auto col-lg-12 px-md-2">
                {props.children}
             </main>
           </div>
         </div>
      </>
    )
   
  
}