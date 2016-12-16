import { connect } from 'react-redux'
import AppComponent from '../components/app'

const mapStateToProps = (state) => {
    return {
        compiler: (state.compiler),
        framework: (state.framework)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);

export default App