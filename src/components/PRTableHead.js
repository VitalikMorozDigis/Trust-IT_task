import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { sortAndFilter } from "../redux/slices/PRSlice";

const PRTableHead = () => {
    const dispatch = useDispatch();
    const [sortField, setSortField] = useState("");
    const [sortDirection, setSortDirection] = useState("ascending");
    const [filters, setFilters] = useState([]);
    const { labels, statuses } = useSelector((state) => state.PR);

    useEffect(() => {
        dispatch(
            sortAndFilter({
                sort: { field: sortField, direction: sortDirection },
                filters,
            })
        );
    }, [sortField, sortDirection, filters]);

    const addFilter = (filter) => {
        if (filter.value === "none") return;
        setFilters((prev) => [...prev, filter]);
    };

    const removeFilter = (id) => {
        setFilters((prev) => 
            prev.filter((item) => item.id !== id)
        );
    };

    return (
        <div className="table_head">
            <div className="table_head__container">
                <div>
                    <label htmlFor="sortSelect">Sort By</label>
                    <div>
                        <select
                            id="sortSelect"
                            onChange={(e) => setSortField(e.target.value)}
                        >
                            <option value="none">None</option>
                            <option value="number">Number</option>
                            <option value="title">Title</option>
                        </select>
                        <select
                            onChange={(e) => setSortDirection(e.target.value)}
                        >
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="labelSelect">Filter By Label</label>
                    <div>
                        <select
                            id="labelSelect"
                            onChange={(e) =>
                                addFilter({
                                    id: `label:${e.target.value}`,
                                    type: "label",
                                    value: e.target.value,
                                })
                            }
                        >
                            <option value="none">None</option>
                            {Object.values(labels).map((label) => (
                                <option
                                    key={label.id}
                                    value={label.name}
                                    title={label.description}
                                >
                                    {label.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="statusSelect">Filter By Status</label>
                    <div>
                        <select
                            id="statusSelect"
                            onChange={(e) =>
                                addFilter({
                                    id: `status:${e.target.value}`,
                                    type: "status",
                                    value: e.target.value,
                                })
                            }
                        >
                            <option value="none">None</option>
                            {Object.values(statuses).map((status) => (
                                <option key={status} value={status} title={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="filters_list">
                {filters.map((filter) => (
                    <div className="filter" key={filter.id}>
                        {filter.type}:{filter.value}
                        <button
                            className="delete_filter_btn"
                            onClick={() => removeFilter(filter.id)}
                        >
                            ✖
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PRTableHead;
