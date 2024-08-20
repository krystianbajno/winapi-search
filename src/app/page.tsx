'use client';

import styles from "@/app/page.module.scss";
import WinApiSearch from "@/app/components/winapi-search/winapi-search";
import UsefulLinks from "@/app/components/useful-links/useful-links";

const links = [
  { name: "Microsoft WinAPI Documentation", href: "https://learn.microsoft.com/en-us/windows/win32/api/" },
  { name: "PHNT", href: "https://github.com/winsiderss/phnt/tree/master" },
  { name: "Undocumented NTInternals", href: "http://undocumented.ntinternals.net/" },
  { name: "ReactOS Documentation", href: "https://doxygen.reactos.org/d6/d9e/include_2reactos_2wine_2winternl_8h.html#a105971fca93ccfeff87707348ea92ac3" },
  { name: "MalAPI.io", href: "https://malapi.io/#" },
  { name: "Unprotect.it", href: "https://unprotect.it" },
  { name: "Vergilius Project", href: "https://www.vergiliusproject.com"},
  { name: "Rust WinAPI bindings", href: "https://github.com/microsoft/windows-rs/tree/master/crates/libs/bindgen/default"},
  { name: "syscalls - ntoskrnl.exe x86", href:"https://j00ru.vexillium.org/syscalls/nt/32/"},
  { name: "syscalls - ntoskrnl.exe x64", href:"https://j00ru.vexillium.org/syscalls/nt/64/"},
  { name: "syscalls - win32k.sys x86", href:"https://j00ru.vexillium.org/syscalls/win32k/32/"},
  { name: "syscalls - win32k.sys x64", href:"https://j00ru.vexillium.org/syscalls/win32k/64/"}

];

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.pageSection} id="winapi-search">
        <UsefulLinks links={links} />
        <WinApiSearch />
      </section>
    </main>
  );
}
