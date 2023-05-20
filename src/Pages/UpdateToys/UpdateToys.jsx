import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import './UpdatedToys.css'
import { useLoaderData } from 'react-router-dom';

const UpdateToys = () => {

    const toy = useLoaderData()
    const {_id} = toy


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext)

    const onSubmit = data => {
        fetch(`http://localhost:5000/update/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount>0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Toy Info updated',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
        
    }


    return (
        <>
            <div className='p-20 input-bg'>
                <h2 className='text-center font-bold text-3xl py-6'>Add your Toys</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='gap-5 grid grid-cols-1 lg:grid-cols-2 w-2/3 mx-auto'>

                    <input className='input' defaultValue=" " {...register("Url")} type='url' placeholder='Url' />

                    <input className='input' defaultValue="moana" {...register("Toy_Name")} type='text' placeholder='Name' />

                    <input className='input' defaultValue={user?.displayName} {...register("Seller_Name", { required: true })} placeholder='SellerName' type='text' />
                    <input className='input' defaultValue={user?.email} {...register("Seller_Email", { required: true })} placeholder='Seller_Email' type='email' />
                    <select className='input' {...register("SubCategory")}>
                        <option value="Animated_character">Animated character</option>
                        <option value="Disney_princess">Disney princess</option>
                        <option value="Frozen_dolls">Frozen dolls</option>
                    </select>
                    <input className='input' defaultValue={''} {...register("Price", { required: true })} placeholder='Price' type='number' />
                    <input className='input' defaultValue={''} {...register("Ratting", { required: true })} placeholder='Ratting' type='text' />
                    <input className='input' defaultValue={''} {...register("Available_Quantity", { required: true })} placeholder='Available_Quantity' type='number' />
                    <textarea className='text p-2 h-20 rounded' defaultValue={''} {...register("description", { required: true })} placeholder='description' ></textarea>

                    {errors.exampleRequired && <span>This field is required</span>}

                    <input className='btn w-full mx-auto' type="submit" />
                </form>
            </div>
        </>
    );
};

export default UpdateToys;