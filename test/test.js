import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after } from 'mocha';
import app from '../startServerWithMongo.js'; 
import mongoose from 'mongoose';
import Appointment from '../model/model.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Appointment Booking', () => {
    before(async () => {
        await mongoose.connect("mongodb+srv://bhavesharya07:ctLHyXD4Ff1O91Hu@cluster0.qrqbe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    after(async () => {
     
        await Appointment.deleteMany({});
        await mongoose.connection.close();
    });

    it('should book an appointment successfully', (done) => {
        chai.request(app)
            .post('/appointments/submit_appointment')
            .send({
                fullName: 'Sumit Arya',
                phoneNumber: '1234567890',
                department: 'Cardiology',
                appointmentDate: '2024-08-30'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Appointment booked successfully');
                done();
            });
    });

    it('should return an error if required fields are missing', (done) => {
        chai.request(app)
            .post('/appointments/submit_appointment')
            .send({
                fullName: '',
                phoneNumber: '1234567890',
                department: 'Cardiology',
                appointmentDate: '2024-08-30'
            })
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.text).to.equal('Error occurred while booking appointment');
                done();
            });
    });
});
