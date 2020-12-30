import { SSL_OP_LEGACY_SERVER_CONNECT } from "constants"

function Container({ className = '', children }) {
  return (<div className={'container mx-auto px-8 ' + className}>

    {children}
  </div>)
}

export default Container
