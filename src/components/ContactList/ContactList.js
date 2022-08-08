import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

import s from './ContactList.module.css';

export default function ContactList() {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);
    const filteredContacts = useSelector(state =>
        state.contacts.filter(item =>
            item.name.toLowerCase().includes(filter.toLowerCase())
        )
    );

    return (
        <ul>
            {filteredContacts.map(contact => {
                const { name, id, number } = contact;

                return (
                    <li key={id} className={s.item}>
                        <span className={s.decor}></span> {name}: {number}{' '}
                        <button
                            className={s.button}
                            type="button"
                            onClick={() => dispatch(deleteContact(id))}
                        >
                            Delete
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
