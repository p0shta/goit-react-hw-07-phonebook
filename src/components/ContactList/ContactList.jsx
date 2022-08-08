import { useSelector } from 'react-redux';
import { useGetContactsQuery } from '../../redux/contactsApi';
import ContactListItem from 'components/ContactListItem/ContactListItem';

export default function ContactList() {
    const filter = useSelector(state => state.filter);
    const { data: contacts, isLoading } = useGetContactsQuery();
    const filteredContacts = contacts?.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {filteredContacts?.map(contact => (
                        <ContactListItem key={contact.id} contact={contact} />
                    ))}
                </ul>
            )}
        </>
    );
}
