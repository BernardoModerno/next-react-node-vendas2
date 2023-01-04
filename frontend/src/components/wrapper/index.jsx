import { NavSup } from '../navsup'

export function Wrapper(props) {
  
    return (
      <>
        <NavSup />
          <div className="container-fluid">
           <div className="row">
             <main className="col-md-12 ms-sm-auto col-lg-12 px-md-2">
                {props.children}
             </main>
           </div>
         </div>
      </>
    )
   
  
}