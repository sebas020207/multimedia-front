import React from 'react'

const AdminTitle = props => {
  return (
    <div style={{width: '100%'}}>
      <h1 style={{color: 'black'}}>{props.children}</h1>
      <br/>
      <hr size="5" color="gray"/>
    </div>
  ) 
}

export default AdminTitle
