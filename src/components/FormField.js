import React from 'react'

export const FormField = ({ children, ...props }) => (
  <div className="form-field" {...props}>
    {children}
  </div>
)
