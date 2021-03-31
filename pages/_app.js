import { Provider } from "react-redux";
import {wrapper} from "App/config/store"
import "App/assets/scss/main.scss"

function App({ Component, pageProps }) {
  return <>
    <div id="app">
      <div className="total-wrapper">
        <Component {...pageProps} />
      </div>
    </div>
    <div id="modal-root"></div>
    <div id="sub-modal-root"></div>
  </>
}

export default wrapper.withRedux(App)
