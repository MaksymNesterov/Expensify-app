import React from "react";
import { shallow } from "enzyme";
import expenses from "../testStore";
import ExpenseForm from "../../components/ExpenseForm";
import moment from "moment";

test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseFrom with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);

  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "New description";
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("description")).toBe(value);
});

test("should set note on textarea change", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "New note";
  wrapper
    .find("textarea")
    .at(0)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("note")).toBe(value);
});

test("should set amount if valid input", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "23.50";
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe(value);
});

test("should set amount if invalid input", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "12.222";
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe("");
});

test("should call onSubmit prop fro valid form submission", () => {
  const onSubmitSpy = jest.fn();

  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test("should set new date on dadte change", () => {
  const wrapper = shallow(<ExpenseForm />);
  const now = moment();
  wrapper.find("SingleDatePicker").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set calendar foccus on change", () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
  expect(wrapper.state("calendarFocused")).toEqual(focused);
});
