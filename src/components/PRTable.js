import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/slices/PRSlice";
import PRTableHead from "./PRTableHead";
import PRTableItem from "./PRTableItem";

const PRTable = () => {
    const { resultList, error, isLoading } = useSelector((state) => state.PR);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchList());
    }, []);

    if (isLoading)
        return (
            <div className="spinner_container">
                <Spinner animation="border" role="status"></Spinner>
            </div>
        );

    if (error) {
        return <div>Something went wrong! Try again later</div>;
    }

    return (
        <>
            <PRTableHead />
            {resultList.map((item) => (
                <PRTableItem key={item.id} item={item} />
            ))}
        </>
    );
};

export default PRTable;
