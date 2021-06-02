import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../axiosClient";

export const fetchList = createAsyncThunk("PR/fetchList", async () => {
    const response = await axiosClient.get("/api/vcs/prs");
    return response.data;
});

export const PRSlice = createSlice({
    name: "PR",
    initialState: {
        list: [],
        resultList: [],
        error: null,
        isLoading: false,
        labels: {},
        statuses: {},
    },
    reducers: {
        sortAndFilter: (state, action) => {
            const { filters, sort } = action.payload;
            let fullList = [...state.list];
            for (const filter of filters) {
                if (filter.value === "none") break;
                switch (filter.type) {
                    case "label":
                        fullList = fullList.filter((item) =>
                            item.labels.find(
                                (label) => label.name === filter.value
                            )
                        );
                        break;
                    case "status":
                        fullList = fullList.filter(
                            (item) => item.state === filter.value
                        );
                }
            }

            const { field, direction } = sort
            if (field === "none") state.resultList = fullList;
            else {
                state.resultList = fullList.sort((a, b) => {
                    const fieldA = a[field];
                    const fieldB = b[field];
                    const [leftOperand, rightOperand] =
                        direction === "ascending"
                            ? [fieldA, fieldB]
                            : [fieldB, fieldA];
                    return leftOperand > rightOperand
                        ? 1
                        : leftOperand < rightOperand
                        ? -1
                        : 0;
                });
            }
        },
    },
    extraReducers: {
        [fetchList.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.resultList = action.payload;
            state.isLoading = false;
            action.payload.forEach((item) => {
                state.statuses[item.state] = item.state;
                item.labels.forEach(
                    (label) => (state.labels[label.id] = label)
                );
            });
        },
        [fetchList.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchList.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = "Something went wrong! Try again later!";
        },
    },
});

export const { sortAndFilter } = PRSlice.actions;

export default PRSlice.reducer;
