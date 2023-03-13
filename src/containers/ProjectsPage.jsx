import React from "react";


import { useEffect, useState, useCallback } from 'react';

import Table from 'react-bootstrap/Table';


import axios from 'axios';


const {api_body_info} = require('../cred_details.js');


function ProjectsPage() {


  const [response, setResponse] = useState([])

  useEffect(()=> {
    axios.post('http://127.0.0.1:5000/projects',
    api_body_info
  )
    .then((res)=> {
      // console.log(res.data)
        setResponse(res.data);
      });
  },[]);


  var all_keys=Object.keys(response)
  console.log(all_keys)


console.log(response)

  return (
  <div>
    <Table bordered >
            <thead className="table-active">
                <tr>
                   {all_keys.map(key_proj=>
                      <th>
                          {key_proj}
                      </th>
                      )}
                </tr>
            </thead>
                <tbody>
                     
                    <tr>

                    {all_keys.map((e, index) => {
                      // console.log(response,e,response[e])
                      if (response[e]!=undefined){
                        return (
                        <td>
                          {
                          response[e].map((subItems, sIndex) => {
                            return <tr>  {subItems}</tr>
                          })
                          
                          }
                        </td>
                      );
                      }
                      
                    })}




                    </tr>

                    


                    

                        
                        
                        
                    
                    
                </tbody>
            </Table>
    
    
  </div>
  
  
  );
}

export default ProjectsPage;


