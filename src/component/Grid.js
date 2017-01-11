import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { ISODateToDate } from '../utils';

class Grid extends React.Component {

    filterItemsByForm() {
        var items = [], streams = this.props.streams, form = this.props.form;

        streams.forEach((item) => {
            item.createDate = new Date(item.created_at).getTime();
            //filterByDate
            if (item.createDate >= form.minDate.getTime() && item.createDate <= form.maxDate.getTime()) {
                //No filter
                if (form.filterByUser.length === "") {
                    items.push(item);
                } else if (item.actor.login.toLowerCase().includes(form.filterByUser.toLowerCase())) {
                    items.push(item);
                }
            }
        });
        return items;
    }

    render() {
        const itemRender = (item) => {
            return (
                <TableRow key={item.id}>
                    <TableRowColumn>
                        <img src={item.actor.avatar_url} alt={item.actor.login} className="avatar" />
                    </TableRowColumn>
                    <TableRowColumn>{item.id}</TableRowColumn>
                    <TableRowColumn>{item.actor.login}</TableRowColumn>
                    <TableRowColumn>{ISODateToDate(item.created_at)}</TableRowColumn>
                </TableRow>
            )
        },
            rows = this.filterItemsByForm().map((item) => itemRender(item));
            this.props.showToast(rows.length);
        return (
            <div id="grid">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Avatar</TableHeaderColumn>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Login</TableHeaderColumn>
                            <TableHeaderColumn>Created At</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </div>
        );
    }
}


export default Grid;