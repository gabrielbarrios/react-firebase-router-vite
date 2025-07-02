import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { useForm } from "react-hook-form";

import { formValidate } from "../utils/formValidate";

import Title from "../componets/Title";
import Button from "../componets/Button";
import FormInput from "../componets/FormInput";
import FormError from "../componets/FormError";
import { erroresFirebase } from "../utils/erroresFirebase";



const Home = () => {

    //el uso de error: dataError 
    //Se podira utilizar en caso de que la variable error ya este declarada y le asignamos un alias 
    const { data, error, loading, getData, addData, deleteData, updateData } = useFirestore();

    const [newOriginID, setnewOriginID] = useState();

    const { register, handleSubmit, formState: { errors }, setError, resetField, setValue } = useForm();
    const { required, patternURL } = formValidate();

    const onSubmit = async ({ url }) => {
        try {
            console.log("inputurl = " + url + "newOriginID " + newOriginID);
            if (newOriginID) {
                await updateData(newOriginID, url);
                setnewOriginID('');
            }
            else {
                await addData(url);
            }
            resetField('url')
        } catch {
            const { code, message } = erroresFirebase(error.code);
            console.error("Error al registrar:", error.code);
            setError(code, {
                message: message
            });
        } finally {

        }




    }

    const handleClickDelete = async (nanoid) => {
        console.log('delete');
        await deleteData(nanoid)
    }

    const handleClickUpdate = (item) => {
        console.log('Update 1 ' + item.origin + "nanoid " + item.nanoid);
        setValue('url', item.origin)
        setnewOriginID(item.nanoid)

        //await updateData(nanoid, neworigin);
    }

    const handleClickCopy = async (nanoid) => {
        try {
            await navigator.clipboard.writeText(window.location.href + nanoid);
            console.log('Texto copiado:', nanoid);
            //con esto remplazamos nuestra propiedad copyPath con una nueva identificada con el nanoid
            setCopyPath((prev) => ({ [nanoid]: true }));
        } catch (err) {
            console.error('Error al copiar:', err);
        }
    }
    //{} lo comvertimos en objeto 
    const [copyPath, setCopyPath] = useState({});
    const pathURL = window.location.href;

    useEffect(() => {
        console.log('getData');
        getData();
    }, []);

    if (loading.getData) return <p>Loading data getData</p>
    if (error) return <p>Error: {error}</p>


    return (
        <>
            <Title text='Home' />
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <FormInput
                    type="text"
                    placeholder="ex:https:google.com"
                    name="URL"
                    {...register('url', {
                        required: required,
                        pattern: patternURL
                    })}
                    error={errors.url}
                >
                    <FormError error={errors.url} />
                </FormInput>
                {
                    newOriginID ? (
                        <Button type='submit' text='Update' color="green" loading={loading.updateData} />
                    )
                        :
                        <Button type='submit' text='Add URL' loading={loading.addData} />
                }

            </form>


            {
                data.map(item => (
                    <div key={item.id} className="mb-2.5 max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{pathURL}{item.nanoid}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.origin}</p>
                        <div className="flex gap-2.5">
                            <Button type='button' text='Eliminar' color='red' loading={loading[item.nanoid]} onClick={() => handleClickDelete(item.nanoid)} />
                            <Button type='button' text='Edit' color='green' onClick={() => handleClickUpdate(item)} />
                            <Button type='button' text={copyPath[item.nanoid] ? 'Copied' : 'Copy'} color='blue' onClick={() => handleClickCopy(item.nanoid)} />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Home;