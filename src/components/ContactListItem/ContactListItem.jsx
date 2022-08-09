import { useDeleteContactMutation } from '../../redux/contactsApi';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import s from './ContactListItem.module.css';

export default function ContactListItem({ contact }) {
    const [deleteContact, { isLoading }] = useDeleteContactMutation();
    const { name, id, number } = contact;

    return (
        <li className={s.item}>
            <span className={s.decor}></span> {name}: {number}
            <button
                className={s.button}
                type="button"
                onClick={() => {
                    deleteContact(id);
                    Notify.success('contact deleted');
                }}
            >
                {isLoading ? 'Deleting...' : 'Delete'}
            </button>
        </li>
    );
}

ContactListItem.propTypes = {
    contact: PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }),
};
