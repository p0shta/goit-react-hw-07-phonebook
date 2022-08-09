import { useState } from 'react';
import { useGetContactsQuery } from '../../redux/contactsApi';

import { useAddContactMutation } from '../../redux/contactsApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import s from './ContactForm.module.css';

export default function ContactForm() {
    const { data: contacts } = useGetContactsQuery();
    const [addContact] = useAddContactMutation();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const onChange = e => {
        const { name, value } = e.target;

        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break;

            default:
                return;
        }
    };

    const onSubmit = e => {
        e.preventDefault();

        const isContactAdded = contacts.find(
            contact => contact.name.toLowerCase() === name.toLowerCase() || contact.number === number
        );

        if (isContactAdded) {
            return Notify.failure('contact has already added');
        } else {
            addContact({ name, number });
            Notify.success('contact added');
        }

        resetState();
    };

    const resetState = () => {
        setName('');
        setNumber('');
    };

    return (
        <>
            <form onSubmit={onSubmit} className={s.form}>
                <label className={s.labelName} htmlFor="name">
                    Name
                </label>
                <input
                    onChange={onChange}
                    id="name"
                    className={s.input}
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />

                <label className={s.labelName} htmlFor="number">
                    Number
                </label>
                <input
                    id="number"
                    type="tel"
                    onChange={onChange}
                    className={s.input}
                    value={number}
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />

                <button type="submit" className={s.button}>
                    Add contact
                </button>
            </form>
        </>
    );
}
