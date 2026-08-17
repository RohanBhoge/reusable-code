"use client";
import Image from "next/image";
import styles from "./page.module.css";
// import Header from "@/components/navbar/Navbar";
import LoginForm from "@/components/auth/LoginForm";
import Button from "@/components/buttons/Button";
import Card from "@/components/cards/Card";
import Badge from "@/components/badges/Badge";
import Img from "../../public/Images/logoalphera.png";
import BarChart from "@/components/charts/BarChart";
import DoubleBarChart from "@/components/charts/DoubleBarChart";
import LineChart from "@/components/charts/LineChart";
import Loader from "@/components/common/Loader";
import Skeleton from "@/components/common/Skeleton";
import Toast from "@/components/common/Toast";
import { Dropdown, EventForm, TextInput } from "@/components/forms";
import AppShell from "@/components/layout/AppShell";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ProgressBar from "@/components/progress/ProgressBar";
import SearchBar from "@/components/search/SearchBar";
import Table from "@/components/tables/Table";
import Pagination from "@/components/tables/Pagination";
import Tabs from "@/components/tabs/Tabs";

export default function Home() {
  return (
    <div className={`${styles.page} d-flex flex-column gap-4`}>
      <Header />
      <LoginForm />
      <Badge />
      <Button />
      <Card image={Img} />
      <BarChart />
      <DoubleBarChart />
      <LineChart />
      {/* <Loader /> */}
      <Skeleton />
      <Toast />
      <Dropdown />
      <EventForm />
      <TextInput />
      <AppShell />
      <Header />
      <Sidebar />
      <ProgressBar />
      <SearchBar />
      <Pagination />
      <Table />
      <Tabs />
    </div>
  );
}