import React from 'react';
import {shallow} from 'enzyme';
import Row from '../src/Row'

let rowComponent, div, row;
beforeEach(() => {
    div = document.createElement('div');
    row = "x,x,x,x,x,x,x,x"
    rowComponent = shallow(<Row id={1} changeColor={() => true} row={row}/>, div);
});

describe('Game board testing', ()=> {
    it('renders the row component', () => {
        expect(rowComponent.find('#rowComponent')).toHaveLength(1);
    });

    it('it renders the span html for each cell in the row', () => {
        expect(rowComponent.find('.cell-block')).toHaveLength(8);
    });
});
