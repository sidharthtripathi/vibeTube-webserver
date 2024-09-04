import amqp from 'amqplib'
import type {Connection,Channel} from 'amqplib'
export async function sendToQueue(msg : {rawVideoUrl:string}){
    let connection:Connection
    let channel:Channel
    try {
        connection  = await amqp.connect(process.env.RABBITMQ_CONNECTION_URL as string)
        channel = await connection.createChannel()
        await channel.assertQueue("rawvideos")
        await channel.sendToQueue("rawvideos",Buffer.from(JSON.stringify(msg)))
        await channel.close()
        await connection.close()
    } catch (error) {
        throw error
    }
}
