import React, {useEffect, useState} from 'react';
import Pagination from '../components/Pagination';
import InvoicesAPI from '../services/invoicesAPI';
import moment from 'moment';
import { Link } from 'react-router-dom';

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}
const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
}

const InvoicesPages = (props) => {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const fetchInvoices = async () => {
        try{
            const data = await InvoicesAPI.findAll()
            setInvoices(data);
        }catch(error){
            console.log(error.response)
        }
    }

    useEffect(() => {
        fetchInvoices();
    }, [] );

    const formatData = (str) => moment(str).format('DD/MM/YYYY');

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1)
    }

    const handleDelete = async (id) => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try{
            await InvoicesAPI.delete(id)
        }catch(error){
            setInvoices(originalInvoices);
        }
    }

    const itemsPerPage = 10;

    const filteredInvoices = invoices.filter(
        i =>
          i.customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
          i.customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
          i.amount.toString().startsWith(search.toLowerCase()) ||
          STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    );

    const paginatedInvoices = Pagination.getData(
        filteredInvoices,
        currentPage,
        itemsPerPage
    );

    return ( 
        <>
        <div className="d-flex justify-content-between align-items-center">
            <h1>Listes des factures</h1>
            <Link className="btn btn-primary" to="/invoices/new">Créer une facture</Link>
        </div>

            <div className="form-group">
                <input 
                    type="text" className="form-control"
                    onChange={handleSearch}
                    value={search}
                    placeholder="Rechercher ..."
                />
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>n°</th>
                        <th>Client</th>
                        <th className="text-center">Date d'envoi</th>
                        <th className="text-center">Statut</th>
                        <th className="text-center">Montant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedInvoices.map(invoice => 
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>
                                <a href="#">{invoice.customer.firstname} {invoice.customer.lastname}</a>
                            </td>
                            <td className="text-center">{formatData(invoice.sentAt)}</td>
                            <td className="text-center">
                                <span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                            </td>
                            <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                            <td>
                                <Link 
                                    to={"/invoices/" + invoice.id} 
                                    className="btn btn-sm btn-primary mr-1"
                                >
                                    Editer
                                </Link>
                                <button className="btn-sm btn-danger mx-2" onClick={() => handleDelete(invoice.id)} >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={filteredInvoices.length}
                    onPageChanged={handlePageChange}
                />
        </>
     );
}
 
export default InvoicesPages;