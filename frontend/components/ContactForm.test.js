import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);

    const headerElement = screen.queryByText(/Contact Form/i);

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeTruthy();
    expect(headerElement).toHaveTextContent(/Contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstNameField = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameField, "123");

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId('error');
        expect(errorMessages).toHaveLength(3);
    });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstNameField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameField, "12345");

    const lastNameField = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameField, "1");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const errorMessages = await screen.queryAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emaiLField = screen.getByLabelText(/email*/i);
    userEvent.type(emaiLField, 'john123@hotmail');

    const errorMessage = await screen.findByText(/email must be a valid email address/);
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const erroMessage = await screen.findByText(/lastName is a required field/i);
    expect(erroMessage).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstNameField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameField, "12345");

    const lastNameField = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameField, "1");

    const emailField = screen.getByLabelText(/email*/i);
    userEvent.type(emailField, 'john123@hotmail.com');

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText("12345");
        const lastNameDisplay = screen.queryByText("1");
        const emailDisplay = screen.queryByText("john123@hotmail.com");
        const messageDisplay = screen.queryByTestId("messageDisplay");


        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameField, "12345");

    const lastNameField = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameField, "1");

    const emailField = screen.getByLabelText(/email*/i);
    userEvent.type(emailField, 'john123@hotmail.com');

    const messageField = screen.getByLabelText(/Message/i);
    userEvent.type(messageField, 'hello this is a message');

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText("12345");
        const lastNameDisplay = screen.queryByText("1");
        const emailDisplay = screen.queryByText("john123@hotmail.com");
        const messageDisplay = screen.queryByText("hello this is a message");


        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    });
});