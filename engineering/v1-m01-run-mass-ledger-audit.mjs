// Prints only research readiness and missing input evidence. Never infers
// flight performance, airworthiness, or a preferred architecture.
import {readFileSync} from 'node:fs';
import {auditM01MassLedger} from './v1-m01-mass-ledger-audit.mjs';
const read = path => JSON.parse(readFileSync(path,'utf8'));

const ledger = read('engineering/v1-m01-architecture-mass-ledgers.json');
const mission = read('engineering/v1-m01-common-mission.json');
const report = auditM01MassLedger(ledger,mission);
process.stdout.write(JSON.stringify(report,null,2)+'\n');
