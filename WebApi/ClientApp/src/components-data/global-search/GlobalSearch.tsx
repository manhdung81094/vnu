import React from 'react';
import { SearchIcon } from "@primer/octicons-react"
import TextInput from '../../components-ui/text-input';

const GlobalSearch = () => {
    return (
        <TextInput placeholder='Tìm kiếm nhanh học sinh'
            width={240}
            leadingVisual={SearchIcon}
        />
    );
};

export default GlobalSearch;