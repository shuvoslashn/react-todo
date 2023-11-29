import React, { useEffect, useState } from "react";

const localdata = () => {
    let list = localStorage.getItem("data");
    return list ? JSON.parse(localStorage.getItem("data")) : [];
};

const App = () => {
    const [input, setInput] = useState("");
    const [data, setData] = useState(localdata());
    const [toggleBtn, setToggleBtn] = useState(true);
    const [isEdit, setIsEdit] = useState(null);

    const handleData = (e) => {
        e.preventDefault();
        if (!input) {
            alert("Please Write a todo first");
        } else if (input && !toggleBtn) {
            setData(
                data.map((elem) => {
                    if (elem.id === isEdit) {
                        return { ...elem, name: input };
                    }
                    return elem;
                })
            );
            setToggleBtn(true);
            setInput("");
            setIsEdit(null);
        } else {
            const inputData = {
                id: new Date().getTime().toString(),
                name: input,
            };
            setData((prev) => [...prev, inputData]);
            setInput("");
            setToggleBtn(true);
        }
    };

    const editData = (id) => {
        let newData = data.find((e) => {
            return e.id === id;
        });
        setInput(newData.name);
        setToggleBtn(false);
        setIsEdit(id);
    };

    const deleteData = (id) => {
        const check = confirm("Are you sure?");
        check && setData(data.filter((e) => e.id !== id));
    };

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(data));
    }, [data]);

    return (
        <div>
            {/* to do header */}
            <div className='bg-white w-full h-16 shadow-2xl shadow-black/5 flex items-center'>
                <div className='container flex justify-between gap-4 items-center'>
                    <div className='flex items-center gap-4'>
                        <i className='ri-calendar-todo-fill text-3xl' />
                        <p className='text-2xl font-semibold'>Todo List</p>
                    </div>
                    <div className=''>
                        <button
                            onClick={() => {
                                const check = confirm(
                                    "Are you want to remove all todo?"
                                );
                                check && setData([]);
                            }}
                        >
                            Remove all
                        </button>
                    </div>
                </div>
            </div>

            {/* todo input area */}
            <div className='px-8'>
                <form className=' max-w-2xl bg-white border flex justify-center items-center p-4 mx-auto mt-4 md:mt-6 shadow-2xl shadow-black/5'>
                    <input
                        type='text'
                        className='w-full bg-gray-50 border px-4 py-2 focus-visible:rounded-none focus-visible:outline-none focus:border focus:border-teal-500'
                        placeholder='Enter todo'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type='submit'
                        onClick={handleData}
                        className='bg-teal-500 duration-300 text-white px-8 py-2 border border-teal-500 hover:bg-teal-600 hover:border-teal-600'
                    >
                        {toggleBtn ? "Save" : "Edit"}
                    </button>
                </form>
            </div>

            {/* todo cards */}
            <div className='p-8'>
                <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                    {data.map((element) => {
                        return (
                            <div
                                key={element.id}
                                className='bg-white border shadow-2xl shadow-black/5 px-6 py-4 w-full flex gap-8 items-center justify-between'
                            >
                                <p>{element.name}</p>
                                <div className='flex gap-4'>
                                    <div
                                        onClick={() => editData(element.id)}
                                        className=' rounded bg-amber-500/10 hover:bg-amber-500 group px-2 py-1 duration-300 cursor-pointer'
                                    >
                                        <i className='ri-file-edit-line text-2xl text-amber-500 group-hover:text-white duration-300' />
                                    </div>
                                    <div
                                        onClick={() => deleteData(element.id)}
                                        className=' rounded bg-red-500/10 hover:bg-red-500 group px-2 py-1 duration-300 cursor-pointer'
                                    >
                                        <i className='ri-delete-bin-line text-2xl text-red-500 group-hover:text-white duration-300' />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default App;
