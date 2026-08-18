"use client";
import Image from "next/image";
import styles from "./page.module.css";
// import Header from "@/components/navbar/Navbar";
import Img from "../../public/Images/logoalphera.png";
import ProgressBar from "@/components/progress/ProgressBar";
import SearchBar from "@/components/search/SearchBar";
import Table from "@/components/tables/Table";
import Pagination from "@/components/tables/Pagination";
import LoginForm from "@/bootstrapComponents/auth/LoginForm";
import Badge from "@/bootstrapComponents/badges/Badge";
import Button from "@/bootstrapComponents/buttons/Button";
import Card from "@/bootstrapComponents/cards/Card";
import BarChart from "@/bootstrapComponents/charts/BarChart";
import DoubleBarChart from "@/bootstrapComponents/charts/DoubleBarChart";
import LineChart from "@/bootstrapComponents/charts/LineChart";
import Loader from "@/bootstrapComponents/common/Loader";
import Skeleton from "@/bootstrapComponents/common/Skeleton";
import Toast from "@/bootstrapComponents/common/Toast";
import { Dropdown, EventForm, TextInput } from "@/bootstrapComponents/forms";
import ToastContainer from "@/bootstrapComponents/common/ToastContainer";
import AppShell from "@/bootstrapComponents/layout/AppShell";
import Header from "@/bootstrapComponents/layout/Header";
import Sidebar from "@/bootstrapComponents/layout/Sidebar";
import CommonModalWithTrigger from "@/bootstrapComponents/modals/CommonModalWithTrigger";
import Stepbar from "@/bootstrapComponents/progress/Stepbar";
import DataTable from "@/bootstrapComponents/tables/DataTable";
import Tabs from "@/bootstrapComponents/tabs/Tabs";

export default function Home() {
  return (
    <div className={`${styles.page} d-flex flex-column gap-4`}>
      <Header />
      <LoginForm />
      <Badge />
      <Button />
      <Dropdown/>
      <Card image={Img} />
      <BarChart />
      <DoubleBarChart />
      <LineChart />
      <Loader />
      <Skeleton />
      <ToastContainer />
      <Dropdown />
      <EventForm />
      <TextInput />
      <AppShell />
      <Header />
      {/* <Sidebar /> */}
      <CommonModalWithTrigger/>
      <Stepbar />
      <SearchBar />
      <Pagination />
      <Table />
      <DataTable/>
      <Tabs />
    </div>
  );
}