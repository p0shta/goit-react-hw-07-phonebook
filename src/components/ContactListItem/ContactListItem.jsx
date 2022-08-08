import { useDeleteContactMutation } from '../../redux/contactsApi';

import s from './ContactListItem.module.css';

export default function ContactListItem({ contact }) {
    const [deleteContact, { isLoading }] = useDeleteContactMutation();
    const { name, id, number } = contact;

    return (
        <li className={s.item}>
            <span className={s.decor}></span> {name}: {number}
            <button className={s.button} type="button" onClick={() => deleteContact(id)}>
                {isLoading ? 'Deleting...' : 'Delete'}
            </button>
        </li>
    );
}
