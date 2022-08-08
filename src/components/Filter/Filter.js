import { useDispatch, useSelector } from 'react-redux';
import { change } from 'redux/filterSlice';

import s from './Filter.module.css';

export default function Filter() {
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();

    return (
        <>
            <p className={s.title}>Find contacts by name</p>
            <input
                onChange={e => dispatch(change(e.target.value))}
                className={s.input}
                type="text"
                value={filter}
            />
        </>
    );
}
