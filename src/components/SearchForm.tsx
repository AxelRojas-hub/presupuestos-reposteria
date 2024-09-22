import './SearchForm.css';
import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';

interface SearchFormProps {
    data: { product: string; price: number; quantity: number; unit: string }[];
}
//Esta funcion calcula el total de los ingredientes, usando el valor de cada input y la cantidad de cada ingrediente
//Usa el precio traido de la API como referencia
const calcularTotal = (data: { product: string; price: number; quantity: number; unit: string }[], formValues: { [key: string]: string }) => {
    const total = data.reduce((acc, item, index) => {
        const inputValue = parseFloat(formValues[`input${index + 1}`]);
        // Si el valor ingresado no es un número, no lo suma al total
        if (isNaN(inputValue)) return acc;
        // Aplica regla de tres simples y calcula el valor total de cada ingrediente
        const totalPrice = (inputValue * item.price) / item.quantity;
        return acc + totalPrice;
    }, 0);
    //Limita los decimales a 2
    return total.toFixed(2);
};


const SearchForm: React.FC<SearchFormProps> = ({ data }) => {
    //Este reduce crea un objeto con los valores iniciales de los inputs
    const initialFormValues = data.reduce((acc, _, index) => {
        acc[`input${index + 1}`] = '';
        return acc;
    }, {} as { [key: string]: string });


    //States de los inputs
    const [formValues, setFormValues] = useState<{ [key: string]: string }>(initialFormValues);
    const [costosAdicionales, setCostosAdicionales] = useState<string>('');
    const [horasTrabajadas, setHorasTrabajadas] = useState<string>('');
    const [precioHora, setPrecioHora] = useState<string>('');
    // Setea los valores iniciales y resetea los valores de los inputs cuando cambia la data y  
    useEffect(() => {
        setFormValues(initialFormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);


    //Handlers de los inputs y el form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    const costosAdicionalesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCostosAdicionales(e.target.value);
    };
    const horasTrabajadasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHorasTrabajadas(e.target.value);
    };
    const precioHoraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrecioHora(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Esta funcionalidad aún no está implementada');	
    };

    
    //Calcula el total de los ingredientes, los costos adicionales y la mano de obra
    //Utiliza parse porque los valores de los inputs son strings inicialmente
    const totalIngredientes = parseFloat(calcularTotal(data, formValues));
    const totalCostosAdicionales = parseFloat(costosAdicionales) || 0;
    const totalManoDeObra = (parseFloat(horasTrabajadas) * parseFloat(precioHora)) || 0;
    const finalTotal = (totalIngredientes + totalCostosAdicionales + totalManoDeObra).toFixed(2);

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <h3 className='subtitle'>Empezá ingresando el valor de tu mano de obra, luego la cantidad de materiales que usaste</h3>
            <div className="first-form-header">
                <span className="form-header-input">Horas trabajadas</span>
                <span className="form-header-unit">Valor por Hora</span>
            </div>
            <div className="first-form-group">
                <input
                    type="number"
                    name="laborHours"
                    value={horasTrabajadas || ''}
                    onChange={horasTrabajadasChange}
                    className="form-input"
                />
                <input
                    type="number"
                    name="hourlyRate"
                    value={precioHora || ''}
                    onChange={precioHoraChange}
                    className="form-input"
                />
            </div>
            <table className="form-table">
                <thead>
                    <tr>
                        <th>Ingrediente</th>
                        <th>Cantidad</th>
                        <th>Unidad</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product}</td>
                            <td>
                                <input
                                    type="number"
                                    name={`input${index + 1}`}
                                    value={formValues[`input${index + 1}`]}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </td>
                            <td>{item.unit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='form-footer'>
                <FormInput
                label="Costos fijos/Adicionales"
                name="additionalCosts"
                value={costosAdicionales}
                onChange={costosAdicionalesChange}
                />
                <div>
                    <h2 className='h2-final-total'>Total: <span className='total-span'>{finalTotal}$</span></h2>
                    <small>(Para recuperar la inversión inicial)</small>
                </div>
            </div>
            {/* Descargar presupuesto resta implementar */}
            {/* <button type="submit" className="form-submit" >Descargar mi presupuesto</button> */}
        </form>
    );
}
export{SearchForm};