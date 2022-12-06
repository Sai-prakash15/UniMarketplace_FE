import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from "./customStylings";
import debounce from 'lodash.debounce';
import { useDispatch } from "react-redux";
import { fetchList } from "../Redux/actions";
// import "./Home.css"

export function SearchComponent(props) {
    const emitChangeDebounced = debounce(emitChange, 250);
    const dispatch = useDispatch();
    //   const [search, setSearch] = useState(["All"]);
    const searchProducts = (event) => {
        emitChangeDebounced(event.target.value);
    }
    function emitChange(value) {
        dispatch(fetchList({"value": value, "category": props.category}));
        console.log(value, props.category)
    }
    useEffect(() => {
        return () => {
            emitChangeDebounced.cancel();
        }
    }, [])


    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                onChange={searchProducts}
                // value={search}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    );
};