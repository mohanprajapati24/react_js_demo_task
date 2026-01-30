import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Validation50Field = () => {
    console.count('Validation50Field re-render');
    const fields = Array.from({ length: 50 }, (_, i) => `field_${i + 1}`);


    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    })

    const submit = (value) => {
        console.log(`-------value-----`, value)
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">50 Field Validation Form</h2>
            <form onSubmit={handleSubmit(submit)}>
                <div className="row">
                    {fields.map((field) => (
                        <div className="col-md-4 mb-3" key={field}>
                            <label htmlFor={field} className="form-label">
                                {field.replace('_', ' ').toUpperCase()}
                            </label>
                            <input
                                id={field}
                                name={field}
                                type="text"
                                className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                                {
                                ...register(field, {
                                    required: "This field is required",
                                    minLength: {
                                        value: 3,
                                        message: "minimum 3 characters"
                                    },
                                    // validate: (value) => value.trim() !== '' || 'space is not allowd'
                                    validate: (value) =>
                                        value.trim() !== '' || 'Spaces are not allowed'
                                })
                                }
                            />
                            {errors[field] && (
                                <div className="invalid-feedback">
                                    {errors[field].message}
                                </div>
                            )}

                        </div>
                    ))}
                </div>
                <div className="mt-3 mb-5">
                    <button type="submit" className="btn btn-primary w-100">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Validation50Field;