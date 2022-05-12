import { useSelector, useDispatch } from 'react-redux'
import {
    decrement,
    increment,
    selectCount,
} from '../reducers/counterSlice'

function Counter() {
    const dispatch = useDispatch()
    const count = useSelector(selectCount)

    return (
        <div>
            <div>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                <span>{count}</span>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default Counter