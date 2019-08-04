import { connect } from 'react-redux'
import { setFilter, clearCompletedTodo } from '../../actions/actionTypes'
import {getVisibleTodos, getUndoneTodosCount} from '../../selectors/selectors'
import ActionBar from './ActionBar';

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state),
        filter: state.filter,
        count: getUndoneTodosCount(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFilter: (number) => {
            dispatch(setFilter(number))
        },
        clearCompletedTodo: () => {
            dispatch(clearCompletedTodo())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar)