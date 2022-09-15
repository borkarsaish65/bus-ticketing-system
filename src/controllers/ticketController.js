class TicketController {

    testFunction = async(req, res, next) => {



            res.status(200).send({
                message:'working'
            })


    }



}


module.exports = new TicketController;