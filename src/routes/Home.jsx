import { useEffect, useState } from "react";
import Title from "../componets/Title";
import { useFirestore } from "../hooks/useFirestore";
import Button from "../componets/Button";
import FormInput from "../componets/FormInput";

const Home = () => {

    //el uso de error: dataError 
    //Se podira utilizar en caso de que la variable error ya este declarada y le asignamos un alias 
    const { data, error, loading, getData, addData, deleteData, updateData } = useFirestore();
    const [text, setText] = useState('');
    const [newOriginID, setnewOriginID] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newOriginID) {
            await updateData(newOriginID, text);
            setnewOriginID('');
            setText('');
            return
        }
        await addData(text);
        setText('');
    }

    const handleClickDelete = async (nanoid) => {
        console.log('delete');
        await deleteData(nanoid)
    }

    const handleClickUpdate = (item) => {
        console.log('Update 1 ' + item.origin + "nanoid " + item.nanoid);
        setText(item.origin)
        setnewOriginID(item.nanoid)

        //await updateData(nanoid, neworigin);
    }



    useEffect(() => {
        console.log('getData');
        getData();
    }, []);

    if (loading.getData) return <p>Loading data getData</p>
    if (error) return <p>Error: {error}</p>


    return (
        <>
            <Title text='Home' />
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    placeholder="ex:https:google.com"
                    onChange={e => setText(e.target.value)}
                    name="URL"
                    value={text}
                />
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
                    <div key={item.id}>
                        <p>{item.id}</p>
                        <p>{item.nanoid}</p>
                        <p>{item.origin}</p>
                        <p>{item.uid}</p>
                        <Button type='button' text='Eliminar' color='red' loading={loading[item.nanoid]} onClick={() => handleClickDelete(item.nanoid)} />
                        <Button type='button' text='Edit' color='green' onClick={() => handleClickUpdate(item)} />
                    </div>
                ))
            }
        </>
    )
}

export default Home;