using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlatformProject.Data
{
    interface IUnitOfWork
    {

        void Save();

        void Dispose();

    }
}
