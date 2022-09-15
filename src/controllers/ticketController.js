const ticketModel = require('../models/ticket.model');
const HttpException = require('../helper/HttpException');
const peopleDataModel = require('../models/people_data.model');
const {
    v4: uuidv4
} = require('uuid');
const userLoginModel = require('../models/user-login.model');

class TicketController {
    
    
    viewSingleTicket = async(req,res,next)=>{

        let {
            ticket_id
        } = req.params;

       let ticketData = await ticketModel.findAll({ticket_id});

       if(ticketData.length == 0)
       {
            res.status(404).send({
                message:'ticket data not found.'
            })
       }

       if(ticketData[0].booked_by)
       {

        let userDetails = await peopleDataModel.findAll({
            unique_id:ticketData[0].booked_by
        })

        ticketData[0].userDetails = userDetails[0]

       }

       res.status(200).send({
        ticketData:ticketData[0]
    })  


    }
    viewTickets = async(req, res, next) => {

        let {
            status
        } = req.query;

        let params = {};

        if(status)
        {
            params['status'] = status;
        }

        let ticketData = await ticketModel.findAll(params);

        res.status(200).send({
            ticketData
        })


    }
    updateTicketStatus  = async(req, res, next) => {
        console.log(req.body)
        let {
            ticket_id
        } = req.params;

        let {
            status,
            name,
            gender
        } = req.body;

        let ticketData = await ticketModel.findAll({
            ticket_id
        });

        if(ticketData.length == 0)
        {
            res.status(404).send({
                message:'Ticket_id not found.'
            })
        }

        if(!['open','close'].includes(status))
        {
            throw new HttpException(400,`Invalid status value. status value can be either "open" or "close" , recieved ${status}`)
        }

        if(status == 'close')
        {
            if(!(name && gender))
            {
                throw new HttpException(400,'name and gender field required when status is "close".')
            }

            if(name == "")
            {
                throw new HttpException(400,'name field too short. Please provide valid name. ')   
            }

            if(!['M','F'].includes(gender))
            {
                throw new HttpException(400,'Invalid gender value. gender value can be either "M" or "F".')
            }

            let unique_id = uuidv4().replace(/-/g, '');

            let insertionStatus = await peopleDataModel.add({
                name,
                gender,
                unique_id:unique_id
            })

            if(insertionStatus == 1)
            {
                let ticketUpdateStatus = await ticketModel.update({
                    status:'closed',
                    booked_by:unique_id,
                    booked_at: new Date().toLocaleString()
                },{
                    ticket_id
                })


                res.status(200).send({
                    message:'Ticket update successfully'
                })
        
            }
            else{

                res.status(400).send({
                    message:' status updation failed. Something went wrong. Please try again. '
                })

            }


        }
        else if(status == 'open')
        {
            let ticketUpdateStatus = await ticketModel.update({
                status:status,
                booked_by:null,
                booked_at:null
            },{
                ticket_id
            })

            if(ticketUpdateStatus == 1)
            res.status(200).send({
                message:'Ticket update successfully'
            })
        }


    }



}


module.exports = new TicketController;