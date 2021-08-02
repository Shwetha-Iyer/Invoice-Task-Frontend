
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default function Viewinvoice(props){
    var body=[];
    for(var key in props.data.bill_details.items){
        var row = [];
        row.push(props.data.bill_details.items[key].item_desc);
        row.push(props.data.bill_details.items[key].qty);
        row.push(props.data.bill_details.items[key].rate);
        row.push(props.data.bill_details.items[key].amount);
    	body.push(row);
    }
    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        content: [
            {
                text:"Invoice",
                style:"header"
            },
            {
                text:`Invoice ID: ${props.data._id}`,
                fontSize:14,
                margin:[0,40,0,10]
            },
            {
                text:`Invoice No:  ${props.data.invoice_number}` ,
                fontSize:14
            },
            {
                text:`Created Date: ${props.data.created_date}`,
                fontSize:14,
                margin:[0,25,0,10],
                alignment:"right"
            },
            {
                text:`Due Date: ${props.data.due_date}`,
                fontSize:14,
                margin:[0,0,23,10],
                alignment:"right"
            },
            {
                alignment: 'justify',
                margin:[0,30,0,10],
                fontSize:17,
                columns: [
                    {
                        text: "Biller Details",
                        bold:true
                    },
                    {
                        text: "Client Details",
                        bold: true
                    }
                ]
            },
            {
                fontSize:14,
                columns: [
                    {
                        text: `${props.data.biller_details.company_name}`,
                    },
                    {
                        text: `${props.data.client_details.company_name}`,  
                    }
                ]
            },
            {
                fontSize:14,
                margin:[0,5,0,0],
                columns: [
                    {
                        text: `${props.data.biller_details.biller_name}`,
                    },
                    {
                        text: `${props.data.client_details.email}`
                    }
                ]   
            },
            {
                fontSize:14,
                margin:[0,5,0,0],
                columns: [
                    {
                        text: `${props.data.biller_details.address_line1}`
                    },
                    {
                        text: `${props.data.client_details.address_line1}`
                    }
                ]
            },
            {
                fontSize:14,
                margin:[0,5,0,0],
                columns: [
                    {
                        text: `${props.data.biller_details.address_line2}`
                    },
                    {
                        text: `${props.data.client_details.address_line2}`
                    }
                ]
            },
            {
                fontSize:14,
                margin:[0,5,0,0],
                columns: [
                    {
                        text: `${props.data.biller_details.city}`
                    },
                    {
                        text: `${props.data.client_details.city}`
                    }
                ]
            },
            {
                fontSize:14,
                margin:[0,5,0,0],
                columns: [
                    {
                        text: `${props.data.biller_details.state}`
                    },
                    {
                        text: `${props.data.client_details.state}`
                    }
                ]
            },
            {
                fontSize:14,
                margin:[0,5,0,0],
                columns: [
                    {
                        text: `${props.data.biller_details.country}`
                    },
                    {
                        text: `${props.data.client_details.country}`
                    }
                ],
            },
            {
                text:"Bill Details",
                bold:true,
                margin:[0,25,0,0],
                fontSize:17
            },
            {
                margin:[0,10,0,0],
                fontSize:14,
                table: {
                        widths: [300, '*', '*', '*'],
                        alignment:'center',
                        headerRows: 1,
                        body: [[{text: 'Item Description'}, {text:'Qty'},{text: 'Rate'},{text:"Amount"}],...body]   
                },
                layout: 'lightHorizontalLines'
            },
            {
                text:`Sub total:          ${props.data.bill_details.sub_total}`,
                margin:[0,30,35,0],
                alignment:"right",
                fontSize:14
            },
            {
                text:`Tax (${props.data.bill_details.tax_percent}%):          ${props.data.bill_details.tax_amount}`,
                margin:[0,10,35,0],
                alignment:"right",
                fontSize:14
            },
            {
                text:`Total:          ${props.data.bill_details.total}`,
                bold:true,
                margin:[0,10,35,0],
                alignment:"right",
                fontSize:14
            },
            {
                text:`Notes : ${props.data.notes}`,
                fontSize:14,
                margin:[0,25,0,0]
            },
            {
                text:`Terms: ${props.data.terms}`,
                fontSize:14,
                margin:[0,25,0,0]
            }
        ],
        styles:{
            header: {
                fontSize: 35,
                bold: true,
                alignment: "center"
            }
        }
    }
    let downloadInvoice = ()=>{
        pdfMake.createPdf(docDefinition).download("Invoice.pdf");
    }
    return <>
    <div className="container mt-3 border mb-5">
        <div className="row mt-3 pl-4">
            <div className="col-md-12 ">
                <h1 className="text-center pt-3">Invoice</h1>
                <br/>
                <p>
                <button className="btn btn-success align-right" type="button" onClick={e=> downloadInvoice()}>Download as PDF</button>
                </p>
                <br/> <br/>
                <b>Invoice ID :</b> {props.data._id} <br/>
                <b>Invoice No :</b> {props.data.invoice_number} <br/>
                <p className="align-right">
                    <b>Created Date :</b> {props.data.created_date} <br/>
                    <b>Due Date : </b> {props.data.due_date} <br/>
                </p>
            </div>
        </div>
        <div className="row mt-3 pl-4 pt-3">
            <div className="col-6 pl-3">
                <h4 className="text-center">Biller Details</h4>
                <p className="padding-left">
                {props.data.biller_details.company_name} <br/>
                {props.data.biller_details.biller_name} <br/>
                {props.data.biller_details.address_line1}<br/>
                {props.data.biller_details.address_line2}<br/>
                {props.data.biller_details.city}<br/>
                {props.data.biller_details.state}<br/>
                {props.data.biller_details.country}<br/>
                </p>
            </div>
            <div className="col-6 pl-5">
                <h4 className="text-center">Client Details</h4>
                <p className="padding-left">
                {props.data.client_details.company_name} <br/>
                {props.data.client_details.email} <br/>                        
                {props.data.client_details.address_line1}<br/>
                {props.data.client_details.address_line2}<br/>
                {props.data.client_details.city}<br/>
                {props.data.client_details.state}<br/>
                {props.data.client_details.country}<br/>
                </p>
            </div>
        </div>
        <div className="row pt-3 px-4 ">
            <h4>Bill Details</h4> <br/>
            <br/>
            <table className="table table-striped pl-2 pr-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item Description</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.bill_details.items.map((items,index)=>{
                            return <tr key={index}>
                                <td>{index+1}</td>
                                <td>{items.item_desc}</td>
                                <td>{items.qty}</td>
                                <td>{items.rate}</td>
                                <td>{items.amount}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        <div className="row">
            <div className="col-3 pt-3"></div>
            <div className="col-3 pt-3"></div>
            <div className="col-3 pt-3"></div>
            <div className="col-3 pt-3">
                <p>
                    <b>Sub Total : </b> {props.data.bill_details.sub_total} <br/>
                    <b>Tax {`(${props.data.bill_details.tax_percent}%)`}</b> : {props.data.bill_details.tax_amount} <br/>
                    <b> Total :  &nbsp; &nbsp;&nbsp;   </b> {props.data.bill_details.total}
                </p>
            </div>
        </div>
        <div className="row pb-5">
            <div className="col-12">
                <p>
                    <b>Notes : </b> {props.data.notes} <br/>
                    <b>Terms : </b> {props.data.terms} <br/>
                </p>
            </div>

        </div>
    </div>    
    </>
}